import React, { useState } from 'react'
import { useTodo } from '../Context';

const TodoItem = ({ todo }) => {
    const [isEditable, setIseditable] = useState(false);
    const [message, setMessage] = useState(todo.todo)
    const { updateTodo, deleteTodo, ToggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: message })
        setIseditable(false)
    }
    const togglecompleate = ()=>{
        ToggleComplete(todo.id)
    }

    return (
        <>
            <div
                className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.check ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                    }`}
            >
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={todo.check}
                    onChange={togglecompleate}
                />
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent"
                        } ${todo.check ? "line-through" : ""}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    readOnly={!isEditable}
                />
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    onClick={() => {
                        if (todo.check) return;

                        if (isEditable) {
                            editTodo();
                        } else setIseditable((prev) => !prev);
                    }}
                    disabled={todo.check}
                >
                    {isEditable ? "📁" : "✏️"}
                </button>
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                    onClick={() => deleteTodo(todo.id)}
                >
                    ❌
                </button>
            </div>
        </>
    )
}

export default TodoItem