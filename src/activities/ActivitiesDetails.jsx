import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";


function ActivitiesDetails() {
  const [activity, setActivity] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const tryDelete = async (id) => {
      try {
        await deleteActivity(token, id);
        navigate("/activities");
      } catch (error) {
        setError(error.message);
      }
  }    
  useEffect(() => {
    const syncActivity = async () => {
    const data = await getActivity(id);
    setActivity(data);
}
  syncActivity();
  }, [id]);
  
  if (!activity) {
    return <p>Loading...</p>;
  }
  return (
    <article>
      {error && <p>{error}</p>}
      <h1>{activity?.name}</h1>
      <p>{activity?.description}</p>
      <p>{activity?.creatorName}</p>
      <button onClick={() => tryDelete(activity.id)}>Delete</button>
    </article>
  );}


export default ActivitiesDetails;