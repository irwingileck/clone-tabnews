function status(request, response) {
  response.status(200).json({ status: "Conectado" });
}

export default status;
