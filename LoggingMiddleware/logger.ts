type StackType = 'frontend';
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  stack: StackType;
  level: LogLevel;
  package: string;
  message: string;
}

const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

export async function Log(
  stack: StackType,
  level: LogLevel,
  pkg: string,
  message: string
): Promise<void> {
  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message: message,
  };

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Log failed with status ${response.status}`);
    }

    console.log(`[Log] ${level.toUpperCase()} - ${pkg} - ${message}`);
  } catch (error) {
    console.error('[Log] Error sending log:', error);
  }
}
