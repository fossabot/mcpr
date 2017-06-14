const express = require('express');
const router = express.Router();

const dbname = 'mc-registry';
const controller = require('./plugin.controller');
const bukkitController = require('./plugin-bukkit.controller');

/**
 * GET /api/plugins
 */
/*router.get('/', function (req, res) {
    db.list({
        limit: 12
    }, function (err, body) {
        const list = [];
        if (err) {
            console.log(err);
        }
        var itemsProcessed = 0;
        body.rows.forEach((item, index, array) => {
            db.get(item.id, (err, body) => {
                if (err) {
                    console.log(err);
                }
                list.push(body);
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    send(list);
                }
            });
        });
    });

    function send(list) {
        res.json(list);
    }
});*/
const after = function (req, res) {
    if (req.plugin) {
        let plugin = req.plugin.toObject();
        res.json(plugin);
    }
    if (req.bukkitPlugin) {
        let plugin = req.bukkitPlugin;
        res.json(plugin);
    }
    if (req.plugins) {
        let plugins = req.plugins;
        res.json(req.plugins);
    }
    if (req.bukkitPlugins) {
        let plugins = req.plugins;
        res.json(req.plugins);
    } else {
        res.status(204).end();
    }
};

/**
 * @api {get} /plugins Request Plugin List
 * @apiName GetPlugins
 * @apiGroup Plugin
 * 
 * @apiSuccess {Array} plugins       List of plugins.
 */
router.get('/', controller.all, after);
/**
 * @api {post} /plugins Create Plugin
 * @apiName CreatePlugin
 * @apiGroup Plugin
 */
router.post('/', controller.create, after);
/**
 * @api {get} /plugins/:id Get Plugin
 * @apiName GetPlugin
 * @apiGroup Plugin
 * 
 * @apiSuccess {String} _id       ID of plugin.
 */
router.get('/:id', controller.show, after);
router.put('/:id', controller.update, after);
router.delete('/:id', controller.delete, after);

// bukkitdev
router.get('/@bukkitdev/:id', bukkitController.show, after);
router.get('/@bukkitdev', bukkitController.all, after);

module.exports = router;