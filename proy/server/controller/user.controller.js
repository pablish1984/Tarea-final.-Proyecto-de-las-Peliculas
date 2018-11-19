const userController = {};
const userModel = require('../model/user.model');
const service = require('../services/auth.service');

userController.getUsers = async(req, res) => {

    try {
        const list_Users = await userModel.find();
        res.json(list_Users);
    } catch (error) {
        res.send(error);
    }
}

// Verificar ke un a persona es un usuario de nuestro sistema
userController.VerifyUser = async(req, res) => {

    try {
        var user = await userModel.find({ user_name: req.query.user, password: req.query.pass });
        res.json(user);
    } catch (error) {
        res.json(error);
    }

}

// Actualizar un usuario
userController.updateUser = async(req, res) => {
    var usuario;
    try {
        usuario = await userModel.findOneAndUpdate(req.params.id, req.body)
        res.json(usuario)
    } catch (error) {
        res.send(error);
    }
}

// Eliminar un usuario, o lo ke es lo mismo darle de baja
userController.deleteUser = async(req, res) => {
    try {
        await userModel.findOneAndDelete(req.params.id);
        res.send({ message: "Eliminado correctamente" });
    } catch (error) {
        res.send(error);
    }
}

// APARTADO DE REGISTRAR Y AUTENTIFICAR UN USUARIO

// Metodo para REGISTRAR un usuario
userController.signUp = async(req, res) => {
    try {
        const user = new userModel(req.body);

        await user.save();
        return res.send({ token: service.createToken(user) });

    } catch (error) {
        res.json(error);
    }
}


// Funcion para AUTENTIFICAR un usuario y pueda acceder a las rutas de nuestra direccion
userController.signIn = async(req, res) => {
    try {
        const user = await userModel.find({ user_name: req.body.user_name, password: req.body.password })

        if (!user) {
            return res.status(404).send({ message: "El usuario no existe." });
        }

        req.user = user;
        res.status(200).send({
            message: "El usuario se ha logueado correctamente",
            token: service.createToken(user)
        });

    } catch (error) {
        res.status(403).send(error);
    }
}

module.exports = userController;