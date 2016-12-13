
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
    
var fields=[];
var trees=[];
var skys=[];

var treePossiblePositions=[];
var treeUsedPositions=[];

var numerOfTrees=0;

var MAXIMUM_TREE_NUMBER=100;
var TREE_MAX_AGE=60;

var texColorTab = new Array();

/*Matrix Tools*/
var yZoom=-2;
var zRotation = 300.0;
var xTranslate=0;
var zTranslate=0;



var myVar = setInterval(function(){lifeCycle()}, 4000);

function lifeCycle()
{
	if(numerOfTrees<MAXIMUM_TREE_NUMBER)
	{
		/* getTreeProbabilityAtPoint() */
		/* If tree probability > 0.5*/
		
		var pos= Math.floor(Math.random() * 100) + 1;
		console.log(treeUsedPositions);
		if(treeUsedPositions.includes(pos)==false)
		{
			trees.push(new Tree());
			trees[numerOfTrees].createTree(treePossiblePositions[pos].x,treePossiblePositions[pos].y,treePossiblePositions[pos].z-0.005);
			trees[numerOfTrees].setID(pos);
			numerOfTrees++;
			treeUsedPositions.push(pos);			
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
		clearInterval(myVar);
	}
	
}

window.onkeydown = checkKey;
        function checkKey(ev) {
            switch (ev.keyCode) {
                case 87:
                    yZoom-=0.05;
                    break;
                case 83:
                    yZoom+=0.05;
                    break;
				case 68:
                    xTranslate-=0.05;
                    break;
                case 65:
                    xTranslate+=0.05;
                    break;
				case 38:
                    zTranslate-=0.05;
                    break;
				case 40:
                    zTranslate+=0.05;
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
	skys.push(new Sky());
	fields.push(new Field());
	treePossiblePositions=fields[0].getTreePossibility();
	glContext.clearColor(0.2, 0.2, 0.2, 1.0);
    glContext.enable(glContext.DEPTH_TEST);
    glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
    glContext.viewport(0, 0, c_width, c_height);
	changeProjection();
	initTextureWithImage( "js/texture/chess-field.png", texColorTab );
	initTextureWithImage( "js/texture/sky.png", texColorTab );
	for(var i=1; i<11; i++)
	{
		initTextureWithImage( "js/texture/tree_"+String(i)+".png", texColorTab );
	}
	renderLoop();
}



function drawScene()
{
	glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
	mat4.identity(mvMatrix);
	mat4.rotate(mvMatrix, mvMatrix, zRotation/10, [1.0,0.0,0.0]);
	mat4.translate(mvMatrix, mvMatrix, [0, yZoom,0]);
	mat4.translate(mvMatrix, mvMatrix, [xTranslate, 0,0]);
	mat4.translate(mvMatrix, mvMatrix, [0,0,zTranslate]);
	
	skys[0].initDraw(texColorTab);
	skys[0].drawAt(mvMatrix,0.0,0.0,-5.0);
	skys[0].drawAt(mvMatrix,-1.0,0.0,-5.0);
	
	
	fields[0].initDraw(texColorTab);
	fields[0].drawAt(mvMatrix,0.0,0.0,-5.0);
	fields[0].drawAt(mvMatrix,-1.0,0.0,-5.0);
	
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

