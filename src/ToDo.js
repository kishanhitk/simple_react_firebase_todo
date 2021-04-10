
import "./App.css";
import { useState } from "react";
import firebase, { auth, firestore } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextField } from "@material-ui/core";


const Todos = () => {
    const [todo, setTodo] = useState("");
    const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
    const [todos] = useCollectionData(todosRef, { idField: "id" });

    const signOut = () => auth.signOut();

    const onSubmitTodo = (event) => {
        event.preventDefault();

        setTodo("");
        firestore.collection(`users/${auth.currentUser.uid}/todos`).add({
            text: todo,
            complete: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

    };

    return (
        <><center>
            <header>
                <Button onClick={signOut} variant="contained" color="secondary" style={{ margin: 20 }} > Sign Out</Button>
            </header>
            <main>
                <form onSubmit={onSubmitTodo}>
                    <TextField
                        required
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="What's Next?"
                    />
                    <Button type="submit">Add</Button>
                </form>
                {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
            </main>
        </center>
        </>
    );
};

const Todo = ({ id, complete, text }) => {
    const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
    const onCompleteTodo = (id, complete) =>
        todosRef.doc(id).set({ complete: !complete }, { merge: true });

    const onDeleteTodo = (id) => todosRef.doc(id).delete();

    return (
        <div key={id} className="todo">
            <Button
                color={complete ? "primary" : "secondary"}
                className={`todo-item ${complete ? "complete" : ""}`}
                tabIndex="0"
                onClick={() => onCompleteTodo(id, complete)}
            >
                {text}
            </Button>
            <Button variant="outlined" onClick={() => onDeleteTodo(id)}>x</Button>
        </div>
    );
};

export default Todos;
