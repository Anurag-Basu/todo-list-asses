/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input, Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Check, Trash2 } from "react-feather";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [todos, setTodos] = useState<{ task: string; isCompleted: boolean }[]>(
    []
  );
  const [sortedTodos, setSortedTodos] = useState<
    { task: string; isCompleted: boolean }[]
  >([]);

  const [isSortedTitle, setIsSortedTitle] = useState<boolean>(false);
  const [isSortedByComplete, setIsSortedByComplete] = useState<boolean>(false);

  const [todoForm] = useForm();

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const onClickCompletedTask = (i: number) => {
    const updateTodos = [...sortedTodos];
    updateTodos[i].isCompleted = !updateTodos[i].isCompleted;
    setTodos(updateTodos);
  };

  const onFormSubmit = (val: any) => {
    const newTask = { task: val.todo, isCompleted: false };
    setTodos((prev) => [...prev, newTask]);
    todoForm.resetFields();
  };

  const onSortTitle = () => {
    const data = todos.sort((a, b) =>
      isSortedTitle
        ? b.task.localeCompare(a.task)
        : a.task.localeCompare(b.task)
    );
    setTodos(data);
    setIsSortedTitle((prev) => !prev);
  };

  const onSortIsCompleted = () => {
    const data = todos.filter((task) =>
      isSortedByComplete ? !task.isCompleted : task.isCompleted
    );
    console.log(data);
    setSortedTodos(data);
    setIsSortedByComplete((prev) => !prev);
  };
  const onClickViewAllTodos = () => {
    setSortedTodos(todos);
  };

  useEffect(() => {
    setSortedTodos(todos);
  }, [todos]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">Todo List</div>

        {/* Todo Form */}
        <Form onFinish={onFormSubmit} form={todoForm}>
          <Form.Item name="todo" required>
            <Input placeholder="enter a task..." />
          </Form.Item>

          <Button htmlType="submit">Add</Button>
        </Form>

        {/* sorting pannel */}
        <div className="sorting-panel">
          <Button onClick={onSortTitle}>Title</Button>
          <Button onClick={onSortIsCompleted}>isCompleted</Button>
          <Button onClick={onClickViewAllTodos}>View All</Button>
        </div>

        {/* Todo list  */}
        <div className="tasks">
          {sortedTodos.map((task, i) => {
            return (
              <div
                key={uuidv4()}
                className={`todo-item justify-between flex ${
                  task.isCompleted ? "bg-green-300" : "bg-gray-300 p-2 px-4"
                }`}
              >
                <div className="">
                  {task.isCompleted ? <Check /> : <></>}
                  {task.task}
                </div>
                <div className="bin">
                  <Button
                    onClick={() => onClickCompletedTask(i)}
                    className="mr-2"
                    icon={<Check />}
                  />

                  <Button
                    danger
                    onClick={() => deleteTodo(i)}
                    icon={<Trash2 />}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
