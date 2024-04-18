import React, { useEffect } from "react"
import * as THREE from 'three'

// type TURN = "WHITE" | "BLACK";
// type CELL_STATE = TURN | "EMPTY";

const getCellMesh = (state: string):THREE.Mesh =>{
	let size:number = 0.1;
	let color:THREE.Color = new THREE.Color(0x0000ff);
	switch(state){
		case "EMPTY":
			size = 0.05;
			break;
		case "WHITE":
			color = new THREE.Color(0xffffff);
			break;
		case "BLACK":
			color = new THREE.Color(0x000000);
			break;
	}
	
	const geometry = new THREE.BoxGeometry( size, size, size );
	const material = new THREE.MeshBasicMaterial( { color: color} );
	const mesh = new THREE.Mesh( geometry, material );
	return mesh
}
export const Connect4 = () => {
	
	const connect4Board = Array.from({ length: 4 }, () =>
		Array.from({ length: 4 }, () =>
			Array.from({ length: 4 }, () => "EMPTY")
		)
	);
	connect4Board[0][1][2] = "WHITE";
	// connect4Board[1][2][3] = "BLACK";
  useEffect(() => {
    // init
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();

		scene.clear();
		for(let i=0;i<4;i++){
			for(let j=0;j<4;j++){
				for(let k=0;k<4;k++){
					const mesh = getCellMesh(connect4Board[i][j][k]);
					mesh.position.set(i/5-0.3, j/5-0.3, k/5-0.3);
					scene.add( mesh );
				}
			}
		}

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

    function animation( time: number ){
			// if(time%5000 === 0){
			// 	let num = time/5000;
				connect4Board[2][0][2] = "WHITE";
				scene.clear();
				for(let i=0;i<4;i++){
					for(let j=0;j<4;j++){
						for(let k=0;k<4;k++){
							const mesh = getCellMesh(connect4Board[i][j][k]);
							mesh.position.set(i/5-0.3, j/5-0.3, k/5-0.3);
							scene.add( mesh );
						}
					}
				}
			}
    	renderer.render( scene, camera );
    // }
	}, [connect4Board])


	return (
		<div>
					<h1>test</h1>

			<button onClick={()=>{connect4Board[2][0][2] = "WHITE"}}>ボタン</button>
		</div>
	)
}

