
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
    
var fields=[];
var trees=[];
var skyBox=[];

var treePossiblePositions=[];
var treeUsedPositions=[];

var numerOfTrees=0;
var season =0;
var dayNight=0;

var MAXIMUM_TREE_NUMBER=500;
var TREE_MAX_AGE=400;
var MOUVEMENT_SPEED=0.01;

var userGrowingSpeed=5;
var userTreeGrowProb=3;
var userTreeHeight=10;

var texColorTab = new Array();

/*Matrix Tools*/
//var yZoom=0;
var yZoom=-5.5;
var zRotation = 300.0;
var xTranslate=-0.5;
var zTranslate=0.6;
var xRotation =0.0;


var evolutionCycle = setInterval(function(){lifeCycle()}, 2000/this.userGrowingSpeed);

function updateTextInput(val) {
          this.userGrowingSpeed=val; 
		  clearInterval(evolutionCycle);
		  evolutionCycle = setInterval(function(){lifeCycle()}, 2000/this.userGrowingSpeed);
        }
function updateTreeHeight(valHeight) {
          this.userTreeHeight=valHeight; 
        }
function updateProbability(valProb) {
          this.userTreeGrowProb=valProb; 
        }

function lifeCycle()
{
	if(numerOfTrees<MAXIMUM_TREE_NUMBER)
	{
		var pos= Math.floor(Math.random() * 500) + 1;
		//console.log(treeUsedPositions);
		
		if(treeUsedPositions.includes(pos)==false)
		{
			var positionProb = 0;
			if(treeUsedPositions.includes(pos-1)&& treeUsedPositions.includes(pos+1))
			{
				positionProb = 0.5;
			}
			else if(treeUsedPositions.includes(pos-1))
			{
				positionProb = 0.25;
			}
			else if(treeUsedPositions.includes(pos+1))
			{
				positionProb = 0.25;
			}
			else
			{
				positionProb = 0;
			}
			var randFactorProb = Math.random();
			var finalProb = randFactorProb+positionProb+(userTreeGrowProb/10);
			if(finalProb<0.9)
			{
				trees.push(new Tree());
				var leafy = Math.random();
				var coniferous = Math.random();
				if(leafy>coniferous)
				{
					trees[numerOfTrees].createTree(treePossiblePositions[pos].x,treePossiblePositions[pos].y,treePossiblePositions[pos].z-0.005,1,this.userTreeHeight);
				}
				else
				{
					trees[numerOfTrees].createTree(treePossiblePositions[pos].x,treePossiblePositions[pos].y,treePossiblePositions[pos].z-0.005,0,this.userTreeHeight);
				}
				
				trees[numerOfTrees].setID(pos);
				trees[numerOfTrees].setMaxAge(TREE_MAX_AGE);
				numerOfTrees++;
				treeUsedPositions.push(pos);
			}	
		}
		for(var i=0;i<numerOfTrees;i++)
		{
			if(trees[i].getAge()>=TREE_MAX_AGE)
			{
				treeUsedPositions=treeUsedPositions.filter(function(e) { return e !== trees[i].getID()});
				trees.splice(i,1);
				i--;
				numerOfTrees--;
			}
			else
			{
				trees[i].incAge();
			}
		}
	}
	else
	{
		clearInterval(evolutionCycle);
	}
	
}

window.onkeydown = checkKey;
        function checkKey(ev) {
            switch (ev.keyCode) {
                case 87:
					if(yZoom-MOUVEMENT_SPEED<-4.85 && yZoom-MOUVEMENT_SPEED>-5.7)
					{
						yZoom-=MOUVEMENT_SPEED;
					}
                    break;
                case 83:
                    if(yZoom+MOUVEMENT_SPEED<-4.85 && yZoom+MOUVEMENT_SPEED>-5.7)
					{
						yZoom+=MOUVEMENT_SPEED;
					}
                    break;
				case 68:
					if(xTranslate-MOUVEMENT_SPEED<-0.08&& xTranslate-MOUVEMENT_SPEED > -0.9)
                    {
						xTranslate-=MOUVEMENT_SPEED;
					}			
                    break;
                case 65:
                    if(xTranslate+MOUVEMENT_SPEED<-0.08&& xTranslate+MOUVEMENT_SPEED > -0.9)
                    {
						xTranslate+=MOUVEMENT_SPEED;
					}
                    break;
				case 38:
					if(zTranslate-MOUVEMENT_SPEED<0.67 && zTranslate-MOUVEMENT_SPEED>0.5)
					{
						zTranslate-=MOUVEMENT_SPEED;
					}
                    break;
				case 40:
                    if(zTranslate+MOUVEMENT_SPEED<0.67 && zTranslate+MOUVEMENT_SPEED>0.5)
					{
						zTranslate+=MOUVEMENT_SPEED;
					}
					break;
				case 39:
                    xRotation-=0.5;
					break;
				case 37:
                    xRotation+=0.5;
                    break;
                default:
				//console.log(ev.keyCode);
                    break;
                    }
		}

function changeProjection(){
	mat4.perspective(pMatrix, degToRad(40), c_width / c_height, 0.1, 1000.0);
	glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
}

function initShaderParameters(prg)
{
    prg.vertexPositionAttribute = glContext.getAttribLocation(prg, "aVertexPosition");
    glContext.enableVertexAttribArray(prg.vertexPositionAttribute);  
    prg.textureCoordsAttribute  = glContext.getAttribLocation(prg, "aTextureCoord");
	glContext.enableVertexAttribArray(prg.textureCoordsAttribute);
	prg.uColorTexture 			= glContext.getUniformLocation(prg, "uColorTexture"); 
    prg.pMatrixUniform          = glContext.getUniformLocation(prg, 'uPMatrix');
    prg.mvMatrixUniform         = glContext.getUniformLocation(prg, 'uMVMatrix');
}



//Initialisation of the scene
function initScene()
{
	skyBox.push(new Sky(0));
	skyBox.push(new Sky(1));
	fields.push(new Field());
	treePossiblePositions=fields[0].getTreePossibility();
	glContext.clearColor(0.0, 0.0, 0.0, 1.0);
    glContext.enable(glContext.DEPTH_TEST);
    glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
    glContext.viewport(0, 0, c_width, c_height);
	changeProjection();
	initTextureWithImage( "js/texture/chess-field-4.png", texColorTab );
	initTextureWithImage( "js/texture/sky_1.png", texColorTab );
	for(var i=1; i<16; i++)
	{
		initTextureWithImage( "js/texture/tree_"+String(i)+".png", texColorTab );
	}
	for(var i=1; i<16; i++)
	{
		initTextureWithImage( "js/texture/leafy_tree_"+String(i)+".png", texColorTab );
	}
	renderLoop();
}



function drawScene()
{
	glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
	mat4.identity(mvMatrix);
	mat4.rotate(mvMatrix, mvMatrix, zRotation/10, [1.0,0.0,0.0]);
	//mat4.lookAt(mvMatrix, [0,0,0], [0,0,0], [0,0,0]);
	mat4.translate(mvMatrix, mvMatrix, [0, yZoom,0]);
	mat4.translate(mvMatrix, mvMatrix, [xTranslate, 0,0]);
	mat4.translate(mvMatrix, mvMatrix, [0,0,zTranslate]);
	
	skyBox[0].initDraw(texColorTab);
	skyBox[0].drawAt(mvMatrix,0.0,0.0,-5.0);
	skyBox[0].drawAt(mvMatrix,1.0,0.0,-5.0);
	
	skyBox[1].initDraw(texColorTab);
	skyBox[1].drawAt(mvMatrix,0.0,0.0,-5.0);
	skyBox[1].drawAt(mvMatrix,0.003,-0.16,-4.0);
	
	
	fields[0].initDraw(texColorTab);
	fields[0].drawAt(mvMatrix,0.0,0.0,-5.0);
	
	for(var i=0;i<numerOfTrees;i++){
		trees[i].initDraw(texColorTab);
		trees[i].drawAt(mvMatrix,0.0,0.0,-5.0);
	}
	
}

//Initialisation of the webgl context
function initWebGL()
{
    glContext = getGLContext('webgl-canvas');
    initProgram();
    initScene();
	
}

