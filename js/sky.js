class Sky{

	constructor(wallOrientation)
	{
		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.textCoordsBuffer  = null;
			
		this.mvMatrix = mat4.create();
		this.wallOrientationValue=wallOrientation;
		this.init();
		this.season=0;
		this.dayNight=0;
	}
	setSeason(newValue)
	{
		this.season=newValue;
	}
	setDayNight(dnewValue)
	{
		this.dayNight=dnewValue;
	}
	init()
	{	
	
		this.clearBuffers();	
		this.indices = [];
		this.vertices = [];
		this.textCoords =[];
		
		this.generateSky();
		
		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
        this.textCoordsBuffer = getArrayBufferWithArray(this.textCoords);
        this.indexBuffer  = getIndexBufferWithIndices(this.indices);		
	}
	generateSky()
	{
		if(this.wallOrientationValue==1)
		{
			this.vertices.push(0.0,1.0,0.0);
			this.vertices.push(1.0,1.0,0.0);
			this.vertices.push(0.0,1.0,0.5);
			this.vertices.push(1.0,1.0,0.5);
		}
		else
		{
			this.vertices.push(0.0,0.0,0.0);
			this.vertices.push(0.0,1.0,0.0);
			this.vertices.push(0.0,0.0,0.5);
			this.vertices.push(0.0,1.0,0.5);
		}
		
		
		
		
		this.textCoords.push(0.0,0.0);
		this.textCoords.push(0.0,1.0);
		this.textCoords.push(1.0,0.0);
		this.textCoords.push(1.0,1.0);
		
		this.indices.push(0,1,2,3);
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
		if( this.dayNight==0)
		{
			if(this.season==0 ||this.season==1 || this.season==2  )
			{
				glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[4]);
			}
			if(this.season==3)
			{
				glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[6]);
			}
		}
		else
		{
			if(this.season==0 ||this.season==1 || this.season==2  )
			{
				glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[5]);
			}
			if(this.season==3)
			{
				glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[7]);
			}
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