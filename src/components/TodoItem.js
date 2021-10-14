import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from './TodoContext';


const Remove = styled.div`
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border: 1px solid #ced4da;
    border-radius: 16px;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    ${props => 
    props.done && 
    css`
        border: 1px solid #38d9a9;
        color: #38d9a9;
    `}
`;


const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props => 
    props.done && css`
        color: #ced4da;
        text-decoration: line-through;
    `}
`;

function TodoItem({ id, done, text }) {

    const dispatch = useTodoDispatch();

    const onToggle = () => dispatch({
        type: 'TOGGLE',
        id
    });

    const onRemove = () => dispatch({
        type: 'REMOVE',
        id
    });

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone/>}
            </CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);