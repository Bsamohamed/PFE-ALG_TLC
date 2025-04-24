const radius = require('radius');
const dgram = require('dgram');

const RADIUS_SECRET = 'testing123'; // même que dans clients.conf
const RADIUS_SERVER = '172.16.110.129'; // IP de ta VM
const RADIUS_PORT = 1812;

const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const packet = {
      code: 'Access-Request',
      secret: RADIUS_SECRET,
      identifier: 0,
      attributes: [
        ['User-Name', username],
        ['User-Password', password],
      ],
    };

    const encoded = radius.encode(packet);
    const client = dgram.createSocket('udp4');

    client.send(encoded, 0, encoded.length, RADIUS_PORT, RADIUS_SERVER, (err) => {
      if (err) return reject(err);
    });

    client.on('message', (msg) => {
      const response = radius.decode({ packet: msg, secret: RADIUS_SECRET });
      client.close();

      if (response.code === 'Access-Accept') {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    client.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = { authenticateUser };
