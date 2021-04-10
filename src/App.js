import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase';
import SignIn from './SignIn';
import ToDo from './ToDo'
const App = () => {
  const [user] = useAuthState(firebase.auth());
  return user ? <ToDo></ToDo> : <SignIn></SignIn>;
};

export default App;