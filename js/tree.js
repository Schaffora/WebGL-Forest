class Tree{
	constructor(x, y, z)
	{
			this.vertexBuffer = null;
			this.indexBuffer = null;
			this.textCoordsBuffer = null;
			this.texColorTab = new Array();
			this.Age=0;
			this.Ex=x;
			this.Ey=y;
			this.Ez=z;
			this.ID=-1;
			this.mvMatrix = mat4.create();
			this.init();
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
	setID(newID)
	{
		this.ID=newID;
	}
	incAge()
	{
		this.Age+=1;
	}
	getAge()
	{
		return this.Age;
	}
	
	createTree(Ex,Ey,Ez)
		{
			
			var Height=parseInt((Math.random()*6+10));
			
			this.vertices.push((Ex-0.045),Ey,Ez);
			this.vertices.push((Ex+0.045),Ey,Ez);
			this.vertices.push((Ex-0.045),Ey,Ez+Height/100);
			this.vertices.push((Ex+0.045),Ey,Ez+Height/100);
			
			
		
			
			
			for(var i=0; i<1;i++)	
			{
				this.textCoords.push(0.0,0.0);
				this.textCoords.push(1.0,0.0);
				this.textCoords.push(0.0,1.0);
				this.textCoords.push(1.0,1.0);
				
				
			}
			
			var num =this.indices.length;
			for(var i=0; i<4;i++)
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
		
		if(this.Age==0)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[2]);
		}
		if(this.Age==1)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[2]);
		}
		if(this.Age>1 && this.Age<=3)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[3]);
		}
		if(this.Age>3 && this.Age<=5)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[4]);
		}
		if(this.Age>5 && this.Age<=10)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[5]);
		}
		if(this.Age>10 && this.Age<=15)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[6]);
		}
		if(this.Age>15 && this.Age<=20)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[7]);
		}
		if(this.Age>20 && this.Age<=25)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[8]);
		}
		if(this.Age>25 && this.Age<=30)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[9]);
		}
		if(this.Age>30 && this.Age<=35)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[10]);
		}
		if(this.Age>35)
		{
		glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[11]);
		}
	   		
		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	}
	
		drawAt(mvMatrix, x, y, z)
	{
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, this.mvMatrix, vec3.fromValues(x, y, z));
		mat4.multiply(this.mvMatrix, this.mvMatrix, mvMatrix);	
		glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix);
		glContext.drawElements(glContext.TRIANGLE_STRIP, this.indices.length, glContext.UNSIGNED_SHORT,0);
		
	}
}
	