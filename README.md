
# H1-Mod Master Server

[![License](https://img.shields.io/badge/license-%20%20GNU%20GPLv3%20-green?style=plastic)](LICENSE)

This project is a **Master Server implementation** for the [H1-Mod]("https://github.com/auroramod/h1-mod") client of **Call of Duty: Modern Warfare Remastered**. It fetches the master server list from IW4MAdmin-Master and serves it to the H1-Mod clients.

## Features

- Fetches the server list from [IW4MAdmin-Master]("https://github.com/RaidMax/IW4MAdmin-Master").
- Parses and formats server information, including IP addresses and ports.
- Serves the formatted server list to H1-Mod clients via a UDP server.
- Supports IPv4 and domain name resolution to IP.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/aid7n/h1-master.git
    cd h1-mod-master-server
    ```
2. **Install dependencies:**
    ```bash
    npm i
    # or 
    yarn install
    ```
3. **Start the server:**
    ```
    npm run start
    ```

## Configuration

The server runs on UDP port `20810` by default. You can modify this in `/src/config/server.ts` if needed.

The server fetches and parses servers automatically from the [IW4MAdmin-Master]("https://github.com/RaidMax/IW4MAdmin-Master") endpoint:
```plaintext
http://api.raidmax.org:5000/servers
```
Ensure that this endpoint is accessible and returning the expected HTML content containing server information.

You will need to patch your `masterServerIp` and `masterServerPort` in your H1 client for this to work. This can be done by building H1-Mod and changing the DVAR values on register in `server-list.cpp`.

## Contributing

Contributions are welome! Please open an issue or submit a pull request for any features, bug fixes or improvements.
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License
This project is licensed under the GNU GPLv3 License. See the [LICENSE]("https://github.com/aid7n/h1-master/blob/ed13b1dde5504c67243f3249d785262cfb384d41/LICENSE") file for more details.

## Acknowledgements
- [RaidMax]("https://github.com/RaidMax") for the IW4MAdmin-Master implementation making this possible.
- [AuroraMod]("https://github.com/auroramod") for the H1-Mod client implementation.

## Contact
For any questions of suggestions, feel free to reach out via GitHub issues.

## Disclaimer
This project is not affiliated with Activision, or any other developers of the Call of Duty series.

This software has been created purely for the purposes of academic research. It is not intended to be used to attack other systems. Project maintainers are not responsible or liable for misuse of the software. Use responsibly.