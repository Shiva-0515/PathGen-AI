// RoadmapFlow.jsx 

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
  CssBaseline,
  Container,
  Divider,
  TextField,
  MenuItem,
  Box,
  Button
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
  // const [customLevel, setCustomLevel] = useState("");
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
  const extractNumber = (value) => {
  const match = value.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
};

  const handleSubmit = async () => {
    const days = extractNumber(duration);
  if (!course || !level || !days) return;

  setIsLoading(true);

      try {
        const response = await axios.post(
          `${API}/generate-roadmap`,
          { course, level, days },
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
        {/* <h1 style={{ textAlign: 'center', marginBottom: 16 }}>Learning Roadmap Generator</h1>
        <p style={{ textAlign: 'center', color: 'gray', marginBottom: 32 }}>
          Generate personalized learning paths for your coding journey
        </p> */}

        <h1 style={{
            textAlign: 'center',
            marginBottom: '16px',
            fontSize: '3.5em', // Larger font size
            fontWeight: 800, // Bolder
            letterSpacing: '-1px', // Tighter letter spacing
            color: '#333', // Darker, more prominent color
            textShadow: '2px 2px 8px rgba(0,0,0,0.1)', // Subtle text shadow for depth
          }}>
            Learning Roadmap Generator
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#666', // Slightly darker than gray for better readability
            marginBottom: '32px',
            fontSize: '1.2em', // Slightly larger font for the description
            lineHeight: '1.5', // Better line spacing
            maxWidth: '600px', // Limit width for better readability on large screens
            margin: '0 auto 32px auto', // Center the paragraph and apply bottom margin
            fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Modern, clean font stack
          }}>
            Generate personalized learning paths for your coding journey
          </p>
        {/* Inputs */}
        <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 4, 
              flexWrap: 'wrap' 
            }}
          >
            <TextField
              variant="outlined"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Course / Subject"
              sx={{ flex: 1, minWidth: "200px" }}
            />

            <TextField
              label="Level"
              select
              variant="outlined"
              sx={{ flex: 1, minWidth: "200px" }}   // 👈 Forces same sizing
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>

            <TextField
              type="text"
              variant="outlined"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (ex: 30 days)"
              sx={{ flex: 1, minWidth: "200px" }}
            />

            <Button 
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                height: "56px",   // 👈 match TextField height
                flexShrink: 0
              }}
            >
              {isLoading ? "Generating..." : "Generate Roadmap"}
            </Button>
          </Box>


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

