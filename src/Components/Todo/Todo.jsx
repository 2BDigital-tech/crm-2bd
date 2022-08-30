import {
  Button,
  Container,
  Text,
  Title,
  Modal,
  TextInput,
  Group,
  Card,
  ActionIcon,
  Code,
} from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import { MoonStars, Sun, Trash } from "tabler-icons-react";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSummary, setTaskSummary] = useState("");
  const [opened, setOpened] = useState(false);

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "dark" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const taskTitleHandler = (event) => {
    setTaskTitle(event.target.value);
  };

  const taskSummaryHandler = (event) => {
    setTaskSummary(event.target.value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5002/api/tasks/${auth.userId}`
        );
        setTasks(response.tasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log({ taskTitle, taskSummary, auth });

    try {
      const responseData = await sendRequest(
        "http://localhost:5002/api/tasks/addTask",
        "POST",
        JSON.stringify({
          title: taskTitle,
          summary: taskSummary,
          creator: auth.userId,
        }),
        false
      );
      console.log(responseData);
      if (responseData) {
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, defaultRadius: "md" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="App">
          <Modal
            opened={opened}
            size={"md"}
            title={"New Task"}
            withCloseButton={true}
            onClose={() => {
              setOpened(false);
            }}
            centered
          >
            <TextInput
              mt={"md"}
              placeholder={"Task Title"}
              required
              label={"Title"}
              onChange={taskTitleHandler}
            />
            <TextInput
              mt={"md"}
              placeholder={"Task Summary"}
              label={"Summary"}
              onChange={taskSummaryHandler}
            />
            <Group mt={"md"} position={"apart"}>
              <Button
                onClick={() => {
                  setOpened(false);
                }}
                variant={"subtle"}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "indigo", to: "#D00062" }}
                onClick={submitHandler}
              >
                Creer
              </Button>
            </Group>
          </Modal>
          <Container size={550} my={40}>
            <Group position={"apart"}>
              <Title
                align="center"
                sx={{ mb: "5%" }}
                variant="h5"
                color="#BBBBBB"
                fontWeight={"bold"}
              >
                Todo{" "}
              </Title>
              {/* <ActionIcon
								  color={'#D00062'}
								  onClick={() => toggleColorScheme()}
								  size='lg'>
								  {colorScheme === 'dark' ? (
									  <Sun size={16} />
								  ) : (
									  <MoonStars size={16} />
								  )}
							  </ActionIcon> */}
            </Group>
            {tasks.length > 0 ? (
              tasks.map((task, index) => {
                if (task.title) {
                  return (
                    <Card withBorder key={index} mt={"sm"}>
                      <Group position={"apart"}>
                        <Text weight={"bold"}>{task.title}</Text>
                        <ActionIcon
                          onClick={() => {}}
                          color={"red"}
                          variant={"transparent"}
                        >
                          <Trash />
                        </ActionIcon>
                      </Group>
                      <Text color={"dimmed"} size={"md"} mt={"sm"}>
                        {task.summary
                          ? task.summary
                          : "No summary was provided for this task"}
                      </Text>
                    </Card>
                  );
                }
              })
            ) : (
              <Text size={"lg"} mt={"md"} color={"dimmed"}>
                You have no tasks
              </Text>
            )}
            <Button
              variant="gradient"
              gradient={{ from: "#D00062", to: "indigo" }}
              onClick={() => {
                setOpened(true);
              }}
              fullWidth
              mt={"md"}
            >
              Ajouter une Tache
            </Button>
          </Container>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
