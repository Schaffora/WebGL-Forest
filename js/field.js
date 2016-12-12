class Field{
	constructor()
	{
		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.textCoordsBuffer = null;
		this.texColorTab = new Array();
		
		this.treePossibilityPoints = [];
		this.MAX_ITERATIONS=3;
		this.DEPTH = 2;
		
		this.mvMatrix = mat4.create();
		this.init();
	}
	init()
	{	
	
		this.clearBuffers();	
		this.indices = [];
		this.vertices = [];
		this.textCoords =[];

		this.indicesOffset=0;	
		
		this.generateMidpoint(0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0, 0.0,0.0,0.0,0);	
		
		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
		this.textCoordsBuffer = getArrayBufferWithArray(this.textCoords);
        this.indexBuffer  = getIndexBufferWithIndices(this.indices);		
	}
	
	getTreePossibility()
	{
		return this.treePossibilityPoints;
	}
	
	generateMidpoint(Ax,Ay,Az,Bx,By,Bz,Cx,Cy,Cz,Dx,Dy,Dz,iterations){
		
			var Ex=Ax+(Cx-Ax)/2.0;
			var Ey=Cy+(Ay-Cy)/2.0;
			if(Az>0.1 && Az <0.3)
			{
				var Ez=Az+0.03;
			}
			else
			{
				var Ez=Math.random()*Math.random()*(this.DEPTH/100)*3+0.05;
			}

			var Fx=Ax+((Bx-Ax)/2.0);
			var Fy= By;
			var Fz=(Math.abs(Bz-Az));
			
			var Gx=Bx;
			var Gy=Cy+(By-Cy)/2.0;
			var Gz=(Math.abs(Bz-Cz));
			
			var Hx=Dx+(Cx-Dx)/2.0;
			var Hy=Cy;
			var Hz=(Math.abs(Cz-Dz));
			
			var Ix=Ax;
			var Iy=Dy+(Ay-Dy)/2.0;
			var Iz=(Math.abs(Dz-Az));
			
			if(iterations==this.MAX_ITERATIONS)
			{	
				this.getFieldVertices(Ax,Ay,Az,Bx,By,Bz,Cy,Cx,Cz,Dx,Dy,Dz,Ex,Ey,Ez,Fx,Fy,Fz,Gx,Gy,Gz,Hx,Hy,Hz,Ix,Iy,Iz);
			}	
			if (iterations < this.MAX_ITERATIONS) {	
				iterations=iterations+1;
				this.generateMidpoint(Ax,Ay,Az,Fx,Fy,Fz,Ex,Ey,Ez,Ix,Iy,Iz,iterations);
				this.generateMidpoint(Fx,Fy,Fz,Bx,By,Bz,Gx,Gy,Gz, Ex,Ey,Ez,iterations);
				this.generateMidpoint(Ex,Ey,Ez,Gx,Gy,Gz,Cx,Cy,Cz,Hx,Hy,Hz,iterations);
				this.generateMidpoint(Ix,Iy,Iz,Ex,Ey,Ez,Hx,Hy,Hz,Dx,Dy,Dz,iterations);				
			}

		}
	
	getFieldVertices(Ax,Ay,Az,Bx,By,Bz,Cy,Cx,Cz,Dx,Dy,Dz,Ex,Ey,Ez,Fx,Fy,Fz,Gx,Gy,Gz,Hx,Hy,Hz,Ix,Iy,Iz)
		{
				for(i =0 ; i<8; i++)
				{
					this.textCoords.push(0.0,0.0);
					this.textCoords.push(0.0,1.0);
					this.textCoords.push(1.0,1.0);
				}
				
				/*Carré gauche haut */
				this.vertices.push(Ax,Ay,Az); this.vertices.push(Fx,Fy,Fz); this.vertices.push(Ex,Ey,Ez);
				this.vertices.push(Ax,Ay,Az); this.vertices.push(Ix,Iy,Iz); this.vertices.push(Ex,Ey,Ez);

				/* Carré droit haut */
				this.vertices.push(Fx,Fy,Fz); this.vertices.push(Bx,By,Bz); this.vertices.push(Gx,Gy,Gz);
				this.vertices.push(Fx,Fy,Fz); this.vertices.push(Ex,Ey,Ez); this.vertices.push(Gx,Gy,Gz);
				
				/* Carré bas droit */
				this.vertices.push(Ex,Ey,Ez); this.vertices.push(Gx,Gy,Gz); this.vertices.push(Cx,Cy,Cz);
				this.vertices.push(Ex,Ey,Ez); this.vertices.push(Hx,Hy,Hz); this.vertices.push(Cx,Cy,Cz);
				
				/* Carré bas gauche */
				this.vertices.push(Ix,Iy,Iz); this.vertices.push(Ex,Ey,Ez); this.vertices.push(Hx,Hy,Hz);
				this.vertices.push(Ix,Iy,Iz); this.vertices.push(Dx,Dy,Dz); this.vertices.push(Hx,Hy,Hz);
				
				for(var i=0;i<24;i++)
				{
				this.indices.push(i+(this.indicesOffset*24));
				}
				this.indicesOffset++;
				
				this.treePossibilityPoints.push({ x: Ex, y: Ey ,z: Ez});
				this.treePossibilityPoints.push({ x: Bx, y: By ,z: Bz});
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
	    glContext.bindTexture(glContext.TEXTURE_2D, texColorTab[0]);
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