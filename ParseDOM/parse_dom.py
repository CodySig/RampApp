import requests
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
