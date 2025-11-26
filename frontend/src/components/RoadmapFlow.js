// // File: components/RoadmapFlow.jsx
// import React, { useState, useCallback } from 'react';
// import '../App.css';
// import axios from 'axios';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   Position,
//   MarkerType
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import AppAppBar from './AppAppBar';

// const RoadmapFlow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [course, setCourse] = useState('');
//   const [level, setLevel] = useState('');
//   const [duration, setDuration] = useState('');
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [fullData, setFullData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const createNodes = (data) => {
//     const newNodes = [];
//     const newEdges = [];

//     data.forEach((item, index) => {
//     //   const isStart = index === 0;
//       const row = Math.floor(index / 4);
//       const col = index % 4;
//       const offsetX = row % 2 === 1 ? 200 : 0;

//       newNodes.push({
//         id: `node-${index}`,
//         type: 'default',
//         data: {
//           label: (
//             <div className="text-center p-2">
//               <div className="text-xs font-semibold mb-1">Day {item.day}</div>
//               <div className="text-sm font-medium">{item.step}</div>
//             </div>
//           )
//         },
//         position: {
//           x: col * 300 + offsetX,
//           y: row * 200 + 100
//         },
//         style: {
//           background: 'blue',
//           color: 'white',
//           border: '2px solid white',
//           borderRadius: '12px',
//           width: 240,
//           mineHight: 80,
//           fontSize: '14px',
//           fontWeight: '500',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
//         },
//         sourcePosition: Position.Right,
//         targetPosition: Position.Left,
//       });

//       if (index > 0) {
//         newEdges.push({
//           id: `edge-${index}`,
//           source: `node-${index - 1}`,
//           target: `node-${index}`,
//           type: 'smoothstep',
//           animated: true,
//           style: {
//             stroke: '#3b82f6',
//             strokeWidth: 2,
//             strokeDasharray: '8 4'
//           },
//           markerEnd: {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#3b82f6'
//           }
//         });
//       }
//     });

//     setNodes(newNodes);
//     setEdges(newEdges);
//   };

//   const handleSubmit = async () => {
//     if (!course || !level || !duration) return;
//     setIsLoading(true);

//     try {
//       const response = await axios.post('http://localhost:5000/generate-roadmap', {
//         course,
//         level,
//         duration
//       },{
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
//     });

//       const data = response.data.roadmap;
//       setFullData(data);
//       createNodes(data);
//     } catch (error) {
//       console.error('Error generating roadmap:', error);
//     } finally {
//       setIsLoading(false);
//     }
   
//   };

//   const onNodeClick = useCallback((_, node) => {
//     const index = parseInt(node.id.split('-')[1]);
//     setSelectedNode(fullData[index] || null);
//   }, [fullData]);

//   return (
//     <>
//     <AppAppBar
//     position="fixed"
//     sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//     />

//     <div className="min-h-screen bg-slate-900 relative text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-4">Learning Roadmap Generator</h1>
//           <p className="text-lg text-gray-600">Generate personalized learning paths for your coding journey</p>
//         </div>

//         <div className="shadow-slate-500 text-white rounded-2xl p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4 items-end bg-#303136">
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-1 block">Course/Subject</label>
//               <input
//                 type="text"
//                 value={course}
//                 onChange={(e) => setCourse(e.target.value)}
//                 placeholder="e.g., Java Programming"
//                 className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-1 block">Level</label>
//               <input
//                 type="text"
//                 value={level}
//                 onChange={(e) => setLevel(e.target.value)}
//                 placeholder="e.g., Beginner"
//                 className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-1 block">Duration</label>
//               <input
//                 type="text"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 placeholder="e.g., 15 days"
//                 className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
//               />
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//             >
//               {isLoading ? 'Generating...' : 'Generate Roadmap'}
//             </button>
//           </div>
//         </div>

//         {nodes.length > 0 && (
//           <div className="flex gap-6">
//             <div className="flex-1 bg-black text-white shadow rounded-lg p-4">
//               <h2 className="text-xl text-center font-semibold mb-2">Your Learning Path</h2>
//               <div style={{ height: '400px' }}>
//                 <ReactFlow
//                   nodes={nodes}
//                   edges={edges}
//                   onNodesChange={onNodesChange}
//                   onEdgesChange={onEdgesChange}
//                   onNodeClick={onNodeClick}
//                   fitView
//                 fitViewOptions={{ padding: 0.2 }}
//                 style={{ background: 'black' }}
//                 nodesFocusable={true}
//                 edgesFocusable={false}
//                 panOnDrag={true}
//                 zoomOnScroll={true}
//                 zoomOnPinch={true}
//                 proOptions={{ hideAttribution: true }} 
//                 >
//                   {/* <MiniMap /> */}
//                   <Controls 
//                   style = {{color:'black'}}/>
//                   {/* <Background color="#ccc" gap={20} /> */}
//                 </ReactFlow>
//               </div>
//             </div>

//             {selectedNode && (
//         <div className="fixed top-1/2 left-1/2 z-[9999] transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-lg shadow-lg border p-4 w-72 h-72">
//             <div className="flex justify-between items-center mb-2">
//             <h2 className="text-base font-bold truncate">Day {selectedNode.day}</h2>
//             <button
//                 onClick={() => setSelectedNode(null)}
//                 className="text-gray-500 hover:text-gray-700 text-sm"
//             >
//                 ✕
//             </button>
//             </div>
//             <div className="text-sm text-gray-700 overflow-y-auto h-[85%] space-y-2">
//             {selectedNode.concepts.map((c, i) => (
//                 <div key={i}>
//                 <div className="font-medium">{c.name}</div>
//                 <div className="text-gray-600">{c.description}</div>
//                 </div>
//             ))}
//             </div>
//         </div>
//         )}
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default RoadmapFlow;

// File: components/RoadmapFlow.jsx 

//main one don't remove this at all

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
  CssBaseline,
  Container,
  Divider,
} from '@mui/material';
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AppTheme from '../AppTheme';
import AppAppBar from './AppAppBar';

const RoadmapFlow = () => {

  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createNodes = (data) => {
    const newNodes = [];
    const newEdges = [];

    data.forEach((item, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const offsetX = row % 2 === 1 ? 200 : 0;

      newNodes.push({
        id: `node-${index}`,
        type: 'default',
        data: {
          label: (
            <div className="text-center p-2">
              <div className="text-xs font-semibold mb-1">Day {item.day}</div>
              <div className="text-sm font-medium">{item.step}</div>
            </div>
          )
        },
        position: { x: col * 300 + offsetX, y: row * 200 + 100 },
        style: {
          background: '#1976d2', // use MUI primary color
          color: 'white',
          border: '2px solid white',
          borderRadius: '12px',
          width: 240,
          minHeight: 80,
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });

      if (index > 0) {
        newEdges.push({
          id: `edge-${index}`,
          source: `node-${index - 1}`,
          target: `node-${index}`,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#1976d2', strokeWidth: 2, strokeDasharray: '8 4' },
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#1976d2' }
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleSubmit = async () => {
  if (!course || !level || !duration) return;

  setIsLoading(true);

  try {
    const response = await axios.post(
      `${API}/generate-roadmap`,
      { course, level, duration },
      { withCredentials: true }
    );

    setFullData(response.data.roadmap);
    createNodes(response.data.roadmap);
  } catch (error) {
    console.error("Error generating roadmap:", error);
  } finally {
    setIsLoading(false);
  }
};

  const onNodeClick = useCallback((_, node) => {
    const index = parseInt(node.id.split('-')[1]);
    setSelectedNode(fullData[index] || null);
  }, [fullData]);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Container sx={{ mt: 12, mb: 6 }}> {/* Margin top for AppBar */}
        <h1 style={{ textAlign: 'center', marginBottom: 16 }}>Learning Roadmap Generator</h1>
        <p style={{ textAlign: 'center', color: 'gray', marginBottom: 32 }}>
          Generate personalized learning paths for your coding journey
        </p>

        {/* Inputs */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course / Subject"
            style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Level"
            style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration"
            style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isLoading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>

        <Divider sx={{ mb: 4 }} />

        {/* Roadmap */}
        {nodes.length > 0 && (
          <div style={{ height: 500, background: '#121212', padding: 16, borderRadius: 8 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              fitView
              style={{ background: '#121212' }}
              nodesFocusable
              edgesFocusable={true}
              
            >
              <Controls style={{ color: 'black', backgroundColor:'blue'}} />
            </ReactFlow>
          {selectedNode && (
          <div className="fixed top-1/2 left-1/2 z-[9999] transform -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-lg shadow-lg border p-4 w-72 h-72">
            <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold truncate">Day {selectedNode.day}</h2>
            <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-500 hover:text-gray-700 text-sm"
            >
                ✕
            </button>
            </div>
            <div className="text-sm text-gray-700 overflow-y-auto h-[85%] space-y-2">
            {selectedNode.concepts.map((c, i) => (
                <div key={i}>
                <div className="font-medium">{c.name}</div>
                <div className="text-gray-600">{c.description}</div>
                </div>
            ))}
            </div>
        </div>
        )}
          </div>
        )}

      </Container>
    </AppTheme>
  );
};

export default RoadmapFlow;

