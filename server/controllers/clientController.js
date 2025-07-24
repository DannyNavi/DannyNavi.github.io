const registerClient = asyncHandler(async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const { name, email, address, city, state, zip, cell, allergies, birthday } = req.body;

    const clientExists = await Client.findOne({ email });
    if (clientExists) {
      res.status(400);
      throw new Error('client already exists');
    }

    const client = await Client.create({
      name,
      email,
      address,
      city,
      state,
      zip,
      cell,
      allergies,
      birthday
    });

    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      address: client.address,
      city: client.city,
      state: client.state,
      zip: client.zip,
      cell: client.cell,
      allergies: client.allergies,
      birthday: client.birthday,
      token: generateToken(client._id),
    });
  } catch (error) {
    console.error('Client registration failed:', error.message);
    res.status(400).json({ error: error.message });
  }
});
