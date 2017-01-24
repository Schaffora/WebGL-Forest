class Tree{
	constructor(x, y, z)
	{
			this.vertexBuffer = null;
			this.indexBuffer = null;
			this.textCoordsBuffer = null;
			this.texColorTab = new Array();
			this.age=0;
			this.Ex=x;
			this.Ey=y;
			this.Ez=z;
			this.ID=-1;
			this.mvMatrix = mat4.create();
			this.init();
			this.maxAge=0;
			this.type=0;
			this.season=0;
			this.NPR=false;

	}
	init()
	{	
		this.clearBuffers();	
		this.indices = [];
		this.vertices = [];
		this.textCoords =[];
	}
	setNPR(newNPR)
	{
		this.NPR=newNPR;
	}
	setSeason(newValue)
	{
		this.season=newValue;
	}
	getType()
	{
		return this.type;
	}
	getID()
	{
		return this.ID;
	}
	setMaxAge(treeMaxAge)
	{
		this.maxAge=treeMaxAge;
	}
	setID(newID)
	{
		this.ID=newID;
	}
	incAge()
	{
		this.age+=1;
	}
	getAge()
	{
		return this.age;
	}	
	createTree(Ex,Ey,Ez,treeType,userHeight)
		{

			this.type=treeType;
			var finalHeight=parseInt((Math.random()*6)) + parseInt(userHeight/1.5);
			
			this.vertices.push((Ex-0.045),Ey,Ez);
			this.vertices.push((Ex+0.045),Ey,Ez);
			this.vertices.push((Ex-0.045),Ey,Ez+finalHeight/100);
			this.vertices.push((Ex+0.045),Ey,Ez);
			this.vertices.push((Ex-0.045),Ey,Ez+finalHeight/100);
			this.vertices.push((Ex+0.045),Ey,Ez+finalHeight/100);
			
			this.vertices.push(Ex,(Ey-0.045),Ez);
			this.vertices.push(Ex,(Ey+0.045),Ez);
			this.vertices.push(Ex,(Ey-0.045),Ez+finalHeight/100);
			this.vertices.push(Ex,(Ey+0.045),Ez);
			this.vertices.push(Ex,(Ey-0.045),Ez+finalHeight/100);
			this.vertices.push(Ex,(Ey+0.045),Ez+finalHeight/100);
			
			for(var i=0; i<2;i++)	
			{
				this.textCoords.push(1.0,0.0);
				this.textCoords.push(0.0,0.0);
				this.textCoords.push(1.0,1.0);

				this.textCoords.push(1.0,0.0);
				this.textCoords.push(0.0,1.0);
				this.textCoords.push(1.0,1.0);
			}
			
			var num =this.indices.length;
			for(var i=0; i<12;i++)
			{
				this.indices.push(num+i);
			}

			this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
			this.textCoordsBuffer = getArrayBufferWithArray(this.textCoords);
			this.indexBuffer  = getIndexBufferWithIndices(this.indices);	
		}
		
	clearBuffers()
	{
		if(this.vertexBuffer != null)
		{
			glContext.deleteBuffer(this.vertexBuffer);
		}
		if(this.textCoordsBuffer != null)
		{
			glContext.deleteBuffer(this.textCoordsBuffer);
		}
		if(this.indexBuffer != null)
		{
			glContext.deleteBuffer(this.indexBuffer);
		}
	}
	initDraw(texColorTab)
	{
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
		glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.textCoordsBuffer);
		glContext.vertexAttribPointer(prg.textureCoordsAttribute, 2, glContext.FLOAT, false, 0, 0);
		glContext.activeTexture(glContext.TEXTURE0);
		if(this.NPR==false)
		{
			if(this.type==0)
			{
				if(this.season==0 || this.season==1 ||this.season==2)
				{
					this.setTexture(8);
				}
				if(this.season==3)
				{
					this.setTexture(23);
				}
			}
			else
			{
				if(this.season==0)
				{
					this.setTexture(38);
				}
				if(this.season==1)
				{
					this.setTexture(53);
				}
				if(this.season==2)
				{
					this.setTexture(68);
				}
				if(this.season==3)
				{
					this.setTexture(83);
				}
			}
		}
		else
		{
			if(this.type==0)
			{
				this.setTexture(98);
			}
			if(this.type==1)
			{
				this.setTexture(113);
			}
		}
		
		
		
	   		
		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	}
	setTexture(index)
	{
		var evolutionStep= this.maxAge/15;
		
		for(var i=1;i<14;i++)
		{
			if(this.age>(i*evolutionStep) && this.age<=(i+1)*evolutionStep)
			{
				glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[i+index]);
			}
		}
		if(this.age<=1*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[index]);
		}
		
		if(this.age>14*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[index+14]);
		}
	}
	drawAt(mvMatrix, x, y, z)
	{
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, this.mvMatrix, vec3.fromValues(x, y, z));
		mat4.multiply(this.mvMatrix, this.mvMatrix, mvMatrix);	
		glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix);
		glContext.drawElements(glContext.TRIANGLES, this.indices.length, glContext.UNSIGNED_SHORT,0);
		
	}
}
	