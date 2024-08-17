import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../redux/actions/taskActions';
import { Box, Heading, Button, List, ListItem, Spinner, Text, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', dueDate: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    setTaskToEdit(null);
    setTaskForm({ title: '', description: '', dueDate: '' });
    onOpen();
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setTaskForm({ title: task.title, description: task.description, dueDate: task.dueDate });
    onOpen();
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      dispatch(updateTask(taskToEdit._id, taskForm));
    } else {
      dispatch(addTask(taskForm));
    }
    onClose();
  };

  return (
    <Box maxW="lg" mx="auto" mt="10">
      <Heading mb="6">Admin Dashboard</Heading>
      <Button onClick={handleAddTask} colorScheme="teal" mb="6">
        Add New Task
      </Button>
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
              <Button onClick={() => handleEditTask(task)} colorScheme="blue" mr="2">
                Edit
              </Button>
              <Button onClick={() => handleDeleteTask(task._id)} colorScheme="red">
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{taskToEdit ? 'Edit Task' : 'Add Task'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Title"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                mb="4"
              />
              <Input
                placeholder="Description"
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                mb="4"
              />
              <Input
                placeholder="Due Date"
                type="date"
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                mb="4"
              />
              <Button type="submit" colorScheme="teal">
                {taskToEdit ? 'Update Task' : 'Add Task'}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
