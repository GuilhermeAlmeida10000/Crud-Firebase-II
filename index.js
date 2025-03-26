const express = require('express');
const app = express();
const { db, storage } = require('./firebase');
const { getDoc, getDocs, deleteDoc, query, collection, doc, addDoc, updateDoc} = require("firebase/firestore");

app.use(express.json());

//Aqui pega os clientes que temos
app.get('/api/isLogged', async (req, res) => {
    console.log('Peguei todos os clientes!');
        try {
            const data = [];
            const querySnap = await getDocs(
                query(
                    collection(db, "clientes"))
                )
            querySnap.forEach((doc) => {
                console.log(doc.data())
                data.push(doc.data());
            });
            return res.json(data);
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error.message);
            return null;
        
    }

})

//Aqui deletamos um cliente passando seu ID
app.delete('/api/clientes/:id', async (req, res) => {
    try {
        const idUser = req.params.id; // Obtendo o ID da URL
        console.log("ID do cliente a ser deletado:", idUser);

        if (!idUser) {
            return res.status(400).json({ error: "ID do cliente não fornecido." });
        }

        await deleteDoc(doc(db, "clientes", idUser)); // Deletando o documento

        return res.status(200).json({ message: `Cliente com ID ${idUser} deletado com sucesso!` });
    } catch (error) {
        console.error(`Erro ao deletar cliente ${req.params.id}:`, error.message);
        return res.status(500).json({ error: "Erro ao deletar cliente", details: error.message });
    }
});


app.post('/api/clientes', async (req, res) => {
    try {
        const { nome, idade, email } = req.body;

        // Verifica se os campos foram enviados
        if (!nome || !idade || !email) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios: nome, idade, email." });
        }

        await addDoc(collection(db, "clientes"), { nome, idade, email });

        return res.status(201).json({ message: "Cliente criado com sucesso!" });
    } catch (error) {
        console.error("Erro ao criar cliente:", error.message);
        return res.status(500).json({ error: "Erro ao criar cliente", details: error.message });
    }
});

app.put('/api/clientes/:id', async (req, res) => {
    try {
        const idUser  = req.params.id;
        const { nome, idade, email } = req.body;

        if (!nome || !idade || !email) {
            return res.status(400).json({ error: "Todos os campos (nome, idade, email) são obrigatórios." });
        }

        const clienteRef = doc(db, "clientes", idUser);
        const docSnap = await getDoc(clienteRef);

        if (!docSnap.exists()) {
            return res.status(404).json({ error: `Cliente com ID ${idUser} não encontrado.` });
        }
        console.log(docSnap.data());
        await updateDoc(clienteRef, { nome, idade, email });

        return res.status(200).json({ message: `Cliente com ID ${idUser} atualizado com sucesso!` });
    } catch (error) {
        console.error(`Erro ao atualizar cliente ${idUser}:`, error.message);
        return res.status(500).json({ error: "Erro ao atualizar cliente", details: error.message });
    }
});






const port = process.env.PORT || 621;
const server = app.listen(port, () => {
    console.log('Nossa API roda na porta ' + port);
});