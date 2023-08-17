import * as API from 'api';
import React, { useEffect, useState } from 'react';
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer';
import { CircleLoader } from 'react-spinners';
import styled from 'styled-components';

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const onNodeMouseEnter = (event, node) => console.log('mouse enter:', node);
const onNodeMouseMove = (event, node) => console.log('mouse move:', node);
const onNodeMouseLeave = (event, node) => console.log('mouse leave:', node);
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log('context menu:', node);
};

const initialElements = [
  {
    id: 'horizontal-4',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'jompay | 0 ' },
    position: { x: 500, y: 0 }
  },
  {
    id: 'horizontal-5',
    sourcePosition: 'top',
    targetPosition: 'bottom',
    className: 'dark-node',
    data: { label: 'EVAP CSMS' },
    position: { x: 500, y: 100 }
  },
  {
    id: 'horizontal-6',
    sourcePosition: 'bottom',
    targetPosition: 'top',
    data: { label: 'chargeev | 0' },
    position: { x: 500, y: 230 }
  },
  {
    id: 'horizontal-e1-4',
    source: 'horizontal-5',
    type: 'smoothstep',
    target: 'horizontal-4',
    animated: true
  },
  {
    id: 'horizontal-e3-6',
    source: 'horizontal-5',
    type: 'smoothstep',
    target: 'horizontal-6',
    animated: true
  }
];

const HorizontalFlow = ({ className }) => {
  const [elements, setElements] = useState(initialElements);
  const [isLoading, setIsLoading] = useState(false);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const changeClassName = () => {
    setElements((elms) =>
      elms.map((el) => {
        if (el.type === 'input') {
          el.className = el.className ? '' : 'dark-node';
        }

        return { ...el };
      })
    );
  };
  useEffect(() => {
    const runAction = async () => {
      setIsLoading(true);
      await API.get(`/search-chargebox-by-cpo/?search=jomcharge`).then(
        (res) => {
          setElements((el) => {
            return [
              ...el,
              {
                id: 'horizontal-4',
                sourcePosition: 'right',
                targetPosition: 'left',
                data: { label: `JomCharge | ${res.count} ` },
                position: { x: 500, y: 0 }
              }
            ];
          });
        }
      );
      await API.get(`/search-chargebox-by-cpo/?search=chargeev`).then(
        (res1) => {
          setElements((el) => {
            return [
              ...el,
              {
                id: 'horizontal-6',
                sourcePosition: 'bottom',
                targetPosition: 'top',
                data: { label: `ChargeEv | ${res1.count}` },
                position: { x: 500, y: 230 }
              }
            ];
          });
        }
      );
      setIsLoading(false);
    };
    runAction();
  }, []);
  if (isLoading) {
    return (
      <div className="d-flex align-items-center flex-column  vh-100   justify-content-center text-center py-auto">
        <div className="d-flex align-items-center flex-column px-4">
          <CircleLoader color={'#2f2f2f'} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          Please wait while we load.....
        </div>
      </div>
    );
  }
  return (
    <div className={`${className} 100-vh`}>
      <ReactFlow
        className="100-vh"
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        selectNodesOnDrag={false}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseMove={onNodeMouseMove}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeContextMenu={onNodeContextMenu}
      />
    </div>
  );
};

export default styled(HorizontalFlow)`
  .react-flow {
    height: 100%;
    overflow: visible;
    position: relative;
    width: 100%;
  }
`;
