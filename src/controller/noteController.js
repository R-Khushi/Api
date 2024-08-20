const auth = require('../middleware/auth');
const notemodel = require('../model/note');

const createNote = async (req,res) => {
    console.log(req.userId);
    const {title,description} = req.body;

    const newnote = new notemodel({
        title: title,
        description: description,
        userid: req.userId
    });
    try {
        await newnote.save();
        res.status(200).json(newnote);
    } catch (error) {
        console.error(error);
        res.status(404).json({message:'something went wrong create'});
    }
}
const updateNote = async (req,res) => {
    const id = req.params.id;
    const {title,description} = req.body;

    const newnote = new notemodel({
        title: title,
        description: description,
        userid: req.userId
    });
    try {
        const newres = await notemodel.findByIdAndUpdate(id,{ $set: { title, description } },{new:true});
        if (!newres) {
            return res.status(404).json({ message: 'Note not found' }); // Handle case where note is not found
        }
        res.status(201).json(newres);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'something went wrong update'});
    }
}
const deleteNote = async (req,res) => {
    const id = req.params.id;
    try {
        const notes = await notemodel.findByIdAndDelete(id);
        res.status(204).json(notes);
    } catch (error) {
        console.error(error);
        res.status(404).json({message:'something went wrong delete'});
    }
}
const getNote = async (req,res) => {
    try {
        const Note = await notemodel.find({userid:req.userId});
        res.status(200).json(Note);
    } catch (error) {
        console.error(error);
        res.status(404).json({message:'something went wrong get'});
    }
}
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote
}
