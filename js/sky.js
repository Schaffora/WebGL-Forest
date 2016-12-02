class Sky{

	constructor()
	{
		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.colorBuffer = null;
			
		this.mvMatrix = mat4.create();
		this.init();
	}
		
	init()
	{	
	
		this.clearBuffers();	
		this.indices = [];
		this.vertices = [];
		this.colors = [];	
		
		this.generateSky();
		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
        this.colorBuffer  = getVertexBufferWithVertices(this.colors);
        this.indexBuffer  = getIndexBufferWithIndices(this.indices);		
	}
	generateSky()
	{
		this.vertices.push(0.0,1.01,0.5);
		this.vertices.push(0.0,1.01,0.0);
		this.vertices.push(1.0,1.01,0.5);
		
		this.vertices.push(0.0,1.01,0.0);
		this.vertices.push(1.0,1.01,0.0);
		this.vertices.push(1.0,1.01,0.5);
		
		for(var i=0; i<6;i++)
		{
			this.colors.push(0.1,0.1,0.4,1.0);
		}
		this.vertices.push(1.0,1.0,1.0);
		this.indices.push(0,1,2,3,4,5);
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