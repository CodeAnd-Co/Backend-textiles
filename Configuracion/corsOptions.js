module.exports = {
  origin: [process.env.LOCAL_URL, process.env.DEPLOYED_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
