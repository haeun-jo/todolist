import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from './TodoContext';

const CircleButton = styled.div`
    background: #38d9a9;
    &:hover {
    background: #63e6be;
    }
    &:active {
    background: #20c997;
    }

    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 60px;

    transition: 0.4s all ease-in;
    ${props => 
    props.open && css`
        background: #ff6b6b;
        &:hover {
        background: #ff8787;
        }
        &:active {
        background: #fa5252;
        }
        transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    border-radius: 0 0 16px 16px;
    padding: 32px 32px 72px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    outline: none;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    box-sizing: border-box;
`;


function TodoCreate() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onChange = e => setValue(e.target.value);
    const onToggle = () => setOpen(!open);
    const onSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false
            }
        });
        setValue("");
        setOpen(false);
        nextId.current += 1;
    };

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input 
                            autoFocus 
                            placeholder="할 일을 입력 후, Enter 를 누르세요" 
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}  
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);