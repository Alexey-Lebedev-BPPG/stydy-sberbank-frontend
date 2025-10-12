import { Button } from '@headlessui/react';
import { useRef, useEffect, useState, type FC } from 'react';

type WebSocketStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export const WebSocketLogger: FC = () => {
  const socketRef = useRef<WebSocket | null>(null);

  const [connectionStatus, setConnectionStatus] =
    useState<WebSocketStatus>('disconnected');

  useEffect(() => {
    console.log('WebSocket connect...');
    setConnectionStatus('connecting');

    try {
      // тестовый WebSocket сервер
      const ws = new WebSocket('wss://ws.postman-echo.com/raw');

      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected');
        ws.send('Hello WebSocket!');
      };

      ws.onmessage = event => {
        const message = event.data;
        console.log('get message:', message);
      };

      ws.onerror = error => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
      };

      ws.onclose = event => {
        console.log('WebSocket closed:', event.code, event.reason);
        setConnectionStatus('disconnected');
      };
    } catch (error) {
      console.error('error', error);
      setConnectionStatus('error');
    }

    return () => {
      console.log('clean WebSocket');
      if (socketRef.current) {
        socketRef.current.close(1000, 'component will unmount');
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = `Message ${Date.now()}`;
      socketRef.current.send(message);
      console.log('Sended message:', message);
    } else {
      console.warn('WebSocket not connected');
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#28a745';
      case 'connecting':
        return '#ffc107';
      case 'error':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connect...';
      case 'error':
        return 'Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>WebSocketLogger</h2>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          border: '1px solid #dee2e6',
          marginBottom: '15px',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0' }}>Connect status:</h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(),
              marginRight: '10px',
            }}
          />
          {getStatusText()}
        </div>
      </div>
      <Button onClick={sendMessage} disabled={connectionStatus !== 'connected'}>
        Send message
      </Button>
    </div>
  );
};
