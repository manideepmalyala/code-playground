import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addCode, getAllSessions } from "../../data/api";
import { Button, Box,Text,Card,Flex,Avatar } from "@radix-ui/themes";

export default function Home() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allSessions, setAllSessions] = useState([]);

  const navigate = useNavigate();

  async function createSession() {
    try {
      setLoading(true);
      const sessionId = await addCode();
      setSession(sessionId);
      navigate(`session/${sessionId}`);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const thisGetsAllSessions = async () => {
    const sessions = await getAllSessions();
    setAllSessions(sessions);
  };

  useEffect(() => {
    thisGetsAllSessions();
  }, []);
  if (error) return <h1>Error Creating Playground</h1>;

  return (
    <div style={{ display: "flex" }}>
      <Box>
        {allSessions ? allSessions.map((ses) => <Box maxWidth="400px">
  <Card>
    <Flex gap="3" align="center">
      <Box>
        <Text as="div" size="2" weight="bold">
          {ses?.code}
        </Text>
        <Text as="div" size="2" color="gray">
          {ses.createdDateTime}
        </Text>
      </Box>
    </Flex>
  </Card>
</Box>) : null}
      </Box>
      <Button
        variant="soft"
        onClick={() => createSession()}
        className="create-session-button"
      >
        Create a new session
      </Button>
    </div>
  );
}
