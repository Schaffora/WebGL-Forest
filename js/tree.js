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
			this.type=0;
			this.maxAge=0;

	}
	
	init()
	{	
		this.clearBuffers();	
		this.indices = [];
		this.vertices = [];
		this.textCoords =[];
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
		var evolutionStep= this.maxAge/15;
		
		if(this.age<1*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[2+(15*this.type)]);
		}
		if(this.age>1*evolutionStep && this.age<=2*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[3+(15*this.type)]);
		}
		if(this.age>2*evolutionStep && this.age<=3*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[4+(15*this.type)]);
		}
		if(this.age>3*evolutionStep && this.age<=4*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[5+(15*this.type)]);
		}
		if(this.age>4*evolutionStep && this.age<=5*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[6+(15*this.type)]);
		}
		if(this.age>5*evolutionStep && this.age<=6*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[7+(15*this.type)]);
		}
		if(this.age>6*evolutionStep && this.age<=7*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[8+(15*this.type)]);
		}
		if(this.age>7*evolutionStep && this.age<=8*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[9+(15*this.type)]);
		}
		if(this.age>8*evolutionStep && this.age<=9*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[10+(15*this.type)]);
		}
		if(this.age>9*evolutionStep && this.age<=10*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[11+(15*this.type)]);
		}
		if(this.age>10*evolutionStep && this.age<=11*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[12+(15*this.type)]);
		}
		if(this.age>11*evolutionStep && this.age<=12*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[13+(15*this.type)]);
		}
		if(this.age>12*evolutionStep && this.age<=13*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[14+(15*this.type)]);
		}
		if(this.age>13*evolutionStep && this.age<=14*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[15+(15*this.type)]);
		}
		if(this.age>14*evolutionStep)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[16+(15*this.type)]);
		}
	   		
		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
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
	