class Tree{
	constructor(x, y, z)
	{
			this.vertexBuffer = null;
			this.indexBuffer = null;
			this.colorBuffer = null;
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
		this.colors = [];
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
			
			var Height=parseInt((Math.random()*6+5));
			
			this.vertices.push((Ex-0.008),Ey,Ez);
			this.vertices.push((Ex+0.008),Ey,Ez);
			this.vertices.push((Ex-0.008),Ey,Ez+Height/100);
			
			this.vertices.push((Ex-0.008),Ey,Ez+Height/100);
			this.vertices.push((Ex-0.008),Ey,Ez);
			this.vertices.push((Ex+0.008),Ey,Ez+Height/100);
			
			this.vertices.push(Ex,Ey,Ez+Height/100*3);
			this.vertices.push(Ex-0.045,Ey,Ez+Height/100);
			this.vertices.push(Ex+0.045,Ey,Ez+Height/100);
			
			this.vertices.push(Ex,Ey,Ez+Height/100*3);
			this.vertices.push(Ex,Ey-0.045,Ez+Height/100);
			this.vertices.push(Ex,Ey+0.045,Ez+Height/100);
			
			
			for(var i=0; i<6;i++)
			{
			this.colors.push(0.6,0.25,0.14,1.0);	
			}
			this.colors.push(0.1,0.6,0.1,1.0);
			this.colors.push(0.1,0.4,0.1,1.0);
			this.colors.push(0.1,0.4,0.1,1.0);
			
			this.colors.push(0.1,0.7,0.1,1.0);
			this.colors.push(0.1,0.5,0.1,1.0);
			this.colors.push(0.1,0.5,0.1,1.0);	
			
			var num =this.indices.length;
			for(var i=0; i<12;i++)
			{
				this.indices.push(num+i);
			}

			this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
			this.colorBuffer  = getVertexBufferWithVertices(this.colors);
			this.indexBuffer  = getIndexBufferWithIndices(this.indices);	
		}
		
	clearBuffers()
	{
		if(this.vertexBuffer != null)
		{
			glContext.deleteBuffer(this.vertexBuffer);
		}
		if(this.colorBuffer != null)
		{
			glContext.deleteBuffer(this.colorBuffer);
		}
		if(this.indexBuffer != null)
		{
			glContext.deleteBuffer(this.indexBuffer);
		}
	}
	initDraw()
	{
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
		glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorBuffer);
		glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);
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
	