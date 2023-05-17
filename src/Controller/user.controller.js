const { response } = require('express');
const fs = require('fs-extra');
const path = require('path');
const Person = require('../Models/person.model');


const changeFotoProfile = async (req, res = response) => {
    const uidPerson = req.uid;
    const pathNew = req.file.filename;
  
    try {
      const persondb = await Person.findById(uidPerson).exec();
  
      if (!persondb) {
        return res.status(500).json({
          resp: false,
          msj: "Error: No se pudo cambiar la imagen"
        });
      }
  
      console.log(uidPerson);
      console.log('---------------------');
  
      if (persondb.image != undefined) {
        await fs.unlink(path.resolve('src/Uploads/Profile/' + persondb.image));
      }
  
      let updateImage = {
        image: pathNew
      };
  
      await Person.findByIdAndUpdate(uidPerson, updateImage, { new: true, runValidators: true });
  
      res.json({
        resp: true,
        msj: 'Imagen Actualizada',
        profile: pathNew
      });
    } catch (err) {
      return res.status(500).json({
        resp: false,
        msj: "Error: No se pudo cambiar la imagen",
        err
      });
    }
  };
  
  const userPersonalRegister = async (req, res = response) => {
    const { name, lastname, phone, address, reference } = req.body;
    const uid = req.uid;
  
    let data = {
      firstName: name,
      lastName: lastname,
      phone: phone,
      address: address,
      reference: reference
    };
  
    try {
      await Person.findByIdAndUpdate(uid, data, { new: true, runValidators: true });
  
      res.json({
        resp: true,
        msj: 'Información personal añadida'
      });
    } catch (err) {
      return res.status(500).json({
        resp: false,
        msj: 'Error al añadir información personal',
        err
      });
    }
  };
  
  const updateStreetAddress = async (req, res = response) => {
    const { address, reference } = req.body;
    const uid = req.uid;
  
    let data = {
      address: address,
      reference: reference
    };
  
    try {
      await Person.findByIdAndUpdate(uid, data, { new: true, runValidators: true });
  
      res.json({
        resp: true,
        msj: 'Dirección actualizada'
      });
    } catch (err) {
      return res.status(500).json({
        resp: false,
        msj: 'Error al actualizar la dirección',
        err
      });
    }
  };
  
  const getPersonalInformation = async (req, res = response) => {
    const uid = req.uid;
  
    try {
      const persondb = await Person.findById(uid);
  
      if (!persondb) {
        return res.status(500).json({
          resp: false,
          msj: 'Error: No se pudo obtener la información personal'
        });
      }
  
      res.json({
        resp: true,
        msj: 'Esta es la información solicitada:',
        information: persondb
      });
    } catch (err) {
      return res.status(500).json({
        resp: false,
        msj: 'Error: No se pudo obtener la información personal',
        err
      });
    }
  };
  
  module.exports = {
    changeFotoProfile,
    userPersonalRegister,
    updateStreetAddress,
    getPersonalInformation
  };
  