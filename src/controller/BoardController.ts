import Board from "../schema/Board"
const slug = require('slug')
export default class BoardController {

    static async create_board(req, res){
        const data     = {...req.body}
        data['slug']   = slug(data.name)
        const inserted = await Board.create(data)
        if(inserted){
            return res.status(200).json({
                status : true,
                message: "New Board Created",
                data   : {
                    _id : inserted._id,
                    name : inserted.name,
                    slug : inserted.slug
                }
            })
        }
        else{
            return res.status(200).json({
                status : false,
                message: "Some thing went wrong",
            })
        }    
    }

    static async list_board(req,res){
        const result = await Board.find({},{name:1,slug:1});
        return res.status(200).json({
            status : true,
            message: "Fetching Board list",
            data   : result
        })
    }

    static async delete_board(req,res) {
        const deleted = await Board.deleteOne({_id:req.body.id});
        return res.status(200).json({
            status : true,
            message: "Board Deleted",
            data   : deleted
        })
    }

    static async create_panel(req,res) {
        const exisitingPanels = await Board.findOne({_id:req.body.id},{panels:1}).exec();
        const newPanels = [...exisitingPanels.panels,{...req.body.panel}]
        const inserted = await Board.findOneAndUpdate({_id:req.body.id},{$set:{panels:newPanels}},{new:true})
        if(inserted){
            return res.status(200).json({
                status : true,
                message: "Panel Created",
                data   : inserted
            })
        }
        else{
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
            })
        }
    }

    static async get_board_details(req,res){
        const result = await Board.findOne({slug:req.body.slug}).exec()
        if(result){
            return res.status(200).json({
                status : true,
                message: "Fetch Board Details",
                data   : result
            })
        }
        else{
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
            })
        }
    }


    static async delete_panel(req,res) {
        const updated  = await Board.updateOne({_id:req.body.boardId},{$set:{panels:req.body.panels}})
        if(updated){
            return res.status(200).json({
                status : true,
                message: "Panel Deleted",
            })
        }
        else{
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
            })
        }
    }
}