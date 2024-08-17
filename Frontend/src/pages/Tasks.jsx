import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions/taskActions';
import { Box, Heading, Text, List, ListItem, Spinner } from '@chakra-ui/react';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Box maxW="lg" mx="auto" mt="10">
      <Heading mb="6">Your Tasks</Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <List spacing={3}>
          {tasks.map((task) => (
            <ListItem key={task._id} border="1px" borderRadius="md" p="4" mb="3">
              <Text fontWeight="bold">{task.title}</Text>
              <Text>{task.description}</Text>
              <Text>{task.dueDate}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Tasks;
