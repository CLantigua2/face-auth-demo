import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import "./App.css";

function App() {
	const camRef = useRef();
	const canvasRef = useRef();

	return (
		<div className="App">
			<div className="App-header">
				<Webcam
					ref={camRef}
					style={{
						position: "absolute",
						margin: "0 auto",
						left: 0,
						right: 0,
						width: 720,
						height: 480,
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: "absolute",
						margin: "0 auto",
						left: 0,
						right: 0,
						width: 720,
						height: 480,
					}}
				/>
			</div>
		</div>
	);
}

export default App;

/**
 * steps
 * 1. intall dependencies
 *  a) TensorflowJS
 *  b) facial landmark detection model
 *  c) React webcam
 * 2. Setup Webcam and canvas
 * 3. Load facemesh
 * 4. Detect  func
 * 5. Draw utilities
 * 6. Load triangulation
 * 7. Setup triangle path
 * 8. Setup point drawing
 * 9. Add drawMesh to detect function
 */
