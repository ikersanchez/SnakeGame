import React, { useRef, useEffect } from 'react';
import type { GameState } from '../engine/types';
import { GRID_SIZE } from '../engine/types';

interface GameCanvasProps {
    gameState: GameState;
    width?: number;
    height?: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, width = 500, height = 500 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, width, height);

        // Calculate cell size
        const cellSize = width / GRID_SIZE;

        // Draw Grid (Optional, faint)
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(width, i * cellSize);
            ctx.stroke();
        }

        // Draw Food
        const { food, snake } = gameState;
        const foodX = food.x * cellSize + cellSize / 2;
        const foodY = food.y * cellSize + cellSize / 2;
        const radius = cellSize / 2 - 2;

        ctx.fillStyle = '#ff0055';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff0055';
        ctx.beginPath();
        ctx.arc(foodX, foodY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        // Draw Snake
        snake.forEach((segment, index) => {
            const x = segment.x * cellSize;
            const y = segment.y * cellSize;
            const isHead = index === 0;

            ctx.fillStyle = isHead ? '#00ff88' : '#00ccff';
            if (isHead) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00ff88';
            }

            // Slightly smaller than cell for 'segment' look
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            ctx.shadowBlur = 0;
        });

    }, [gameState, width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
                border: '2px solid #333',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                maxWidth: '100%',
                maxHeight: '80vh',
                aspectRatio: '1/1'
            }}
        />
    );
};
