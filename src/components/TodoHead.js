import React from 'react';
import styled from 'styled-components';
import { useTodoState } from './TodoContext';

const TodoHeadBlock = styled.div`
    padding: 48px 32px 24px;
    border-bottom: 1px solid rgb(233, 236, 239);

    h2 {
        font-size: 36px;
        color: #343a40;
        margin-bottom: 4px;
    }

    .day {
        font-size: 21px;
        color: #868e96;
        margin-bottom: 40px;
    }

    .tasks-left {
        font-size: 18px;
        font-weight: bold;
        color: #20c997;
    }
`;

function TodoHead() {

    const todos = useTodoState();
    const undoneTasks = todos.filter(todo => !todo.done).length;

    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const dayName = today.toLocaleDateString('ko-KR', {
        weekday: "long"
    });

    return (
        <TodoHeadBlock>
            <h2>{dateString}</h2>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks}개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;