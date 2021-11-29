const express = require('express')
const { validation, ctrlWrapper } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
const { joiSchema, favoriteJoiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
