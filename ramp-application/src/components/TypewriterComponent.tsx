import React, { useState, useEffect } from 'react';

/**
 * The code to parse the DOM (you can also see it in the ParseDOM directory, but the instructions said put it in the comments :))
 * import requests
from bs4 import BeautifulSoup

# Define the URL
url = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"

# Fetch the page content
try:
    response = requests.get(url)
    response.raise_for_status()
    html_content = response.text
except requests.exceptions.RequestException as e:
    print(f"Error fetching the URL: {e}")
    exit()

# Parse the DOM
soup = BeautifulSoup(html_content, 'html.parser')

hidden_url = ""

# Find all <i> tags within the specified DOM structure
for code_tag in soup.find_all("code", attrs={"data-class": True}):
    div_tag = code_tag.find("div", attrs={"data-tag": True})
    if div_tag:
        span_tag = div_tag.find("span", attrs={"data-id": True})
        if span_tag:
            i_tag = span_tag.find("i", class_="char")
            if i_tag and i_tag.get("value"):
                # Append the character to the hidden_url
                hidden_url += i_tag["value"]

# Print the reconstructed URL
print(hidden_url)
 */

const TypewriterComponent: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/706c61'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      let isCancelled = false;

      const typeCharacter = (index: number) => {
        if (isCancelled) return;

        if (index < data.length) {
          setDisplayText((prev) => [...prev, data.charAt(index)]);
          setTimeout(() => typeCharacter(index + 1), 500);
        }
      };

      typeCharacter(0);

      // Cleanup function to handle component unmounting
      return () => {
        isCancelled = true;
      };
    }
  }, [isLoading, data]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {displayText.map((char, idx) => (
            <li key={idx}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypewriterComponent;
