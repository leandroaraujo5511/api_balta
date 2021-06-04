'use strict'

const mongoose = require("mongoose");
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product
        .find({
            active: true //dentro de find seleciona o filtro
        }, 'title  price slug') // os campos que deseja retornar 
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug, //lista produto pelo slug
            active: true //dentro de find seleciona o filtro
        }, 'title description price slug tags') // os campos que deseja retornar 
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};


exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag, //lista produto pela tag
            active: true //dentro de find seleciona o filtro
        }, 'title description price slug tags') // os campos que deseja retornar 
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({ mensage: 'Produto cadastrado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ mensage: 'Falha ao cadastrar o produto!', data: e });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
            res.status(200).send({
                mensage: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                mensage: 'Falha ao atualizar o produto.',
                data: e
            });
        });
};



exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
            res.status(200).send({
                mensage: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                mensage: 'Falha ao remover o produto.',
                data: e
            });
        });
};