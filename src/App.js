import { useRef, useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import "./App.css";

function App() {
	const camRef = useRef();
	const canvasRef = useRef();
	let timer = useRef();
	let mesh;

	useEffect(() => {
		loadFacemesh();
	}, []);

	useEffect(() => {
		timer.current = setInterval(() => {
			detect(mesh);
		}, 5000);
		return () => clearInterval(timer.current);
	}, [mesh]);

	// Load our facemesh
	const loadFacemesh = useCallback(async () => {
		mesh = await facemesh.load();
	}, [mesh]);

	// Detect Function
	const detect = async (mesh) => {
		// checks if our camera video is ready
		// should return 4 on ready
		if (camRef?.current?.video?.readyState === 4) {
			const video = camRef.current.video;
			const videoWidth = video.videoWidth;
			const videoHeight = video.videoHeight;
			camRef.current.video.width = videoWidth;
			camRef.current.video.height = videoHeight;
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			const predictions = await mesh.estimateFaces(camRef.current.video);
			if (predictions.length > 0) {
				for (let i = 0; i < predictions.length; i++) {
					const keypoints = predictions[i].scaledMesh;

					// Log facial keypoints.
					for (let i = 0; i < keypoints.length; i++) {
						const [x, y, z] = keypoints[i];
						const ctx = canvasRef.current.getContext("2d");
						ctx.beginPath();
						ctx.arc(x, y, 1, 0, 3 * Math.PI);
						ctx.fillStyle = "aqua";
						ctx.fill();
					}
				}
			}
		}
	};

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
