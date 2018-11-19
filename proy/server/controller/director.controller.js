const directorModel = require('../model/director.model');
const directorController = {};

// Devolver Listado de directores
directorController.getDirectors = async(req, res) => {
    try {
        const list_directors = await directorModel.find();
        res.json(list_directors);
    } catch (error) {
        res.json(error);
    }

}

// Devolver Director por Id
directorController.getDirectorById = async(req, res) => {
    try {
        const singleDirector = await directorModel.findById(req.params.id);
        res.json(singleDirector);
    } catch (error) {
        res.json(error);
    }

}

// Insertar Director
directorController.createDirector = async(req, res) => {
    try {

        const aux = {
            name: req.body.name,
            nationality: req.body.nationality
        }
        const director = new directorModel(aux);

        const temp = await director.save();
        res.json({ message: 'Director creado correctamente' });
    } catch (error) {
        res.json(error);
    }

}

// Eliminar director
directorController.deleteDirector = async(req, res) => {
    try {
        await directorModel.findByIdAndDelete(req.params.id);

        res.json({ message: 'Director eliminado correctamente' });
    } catch (error) {
        res.json(error);
    }

}

// Actualizar Director
directorController.updateDirector = async(req, res) => {
    try {
        const temp = {
            name: req.body.name,
            nationality: req.body.nationality
        }

        const aux = await directorModel.findByIdAndUpdate(req.params.id, temp);

        res.json({ message: 'Director actualizado correctamente' });
    } catch (error) {
        res.json(error);
    }

}

module.exports = directorController;