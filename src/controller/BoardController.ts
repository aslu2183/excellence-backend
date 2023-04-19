import Board from "../schema/Board"
import Tasks from "../schema/Tasks"
const slug = require('slug')

export default class BoardController {

    static async create_board(req, res){
        const data     = {...req.body}
        data['slug']   = slug(data.name)
        try{
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
        catch(error:any){
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
                error  : error?.message
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
        try {
            const deleted = await Board.deleteOne({_id:req.body.id});
            await Tasks.deleteMany({boardId:req.body.id})
            
            return res.status(200).json({
                status : true,
                message: "Board Deleted",
                data   : deleted
            })
        } catch (error:any) {
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
                error  : error?.message
            })
        }
        
    }

    static async create_panel(req,res) {
        try{
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
        catch(error:any){
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
                error  : error?.message
            })
        }    
    }

    static async get_board_details(req,res){
        const result = await Board.aggregate()
                    .match({
                        slug : req.body.slug
                    })
                    .lookup({
                        "from" : "tasks",
                        "localField": "_id",
                        "foreignField":"boardId",
                        "as":"tasks"
                    }).exec()
        if(result){
            return res.status(200).json({
                status : true,
                message: "Fetch Board Details",
                data   : result[0]
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
        try{
            const updated  = await Board.updateOne({_id:req.body.boardId},{$set:{panels:req.body.panels}})
            await Tasks.deleteMany({panelId:req.body.deletedPanel})

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
        catch(error:any){
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
                error  : error?.message
            })
        }    
    }

    static async create_task(req,res) {
        const data = req.body
        try{
            const inserted = await Tasks.create(data);
            if(inserted){
                return res.status(200).json({
                    status : true,
                    message: "New Task Created",
                    data   : {
                        insertedId : inserted._id
                    }
                }) 
            }
            else{
                return res.status(200).json({
                    status : false,
                    message: "Something went wrong",
                })
            }
        }
        catch(error:any){
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
                error  : error?.message
            })
        }    
    }

    static async delete_task(req,res){
        try {
            const deleted = await Tasks.deleteOne({_id:req.body.id});
            return res.status(200).json({
                status : true,
                message: "Task Deleted",
                data   : deleted
            })
        } catch (error:any) {
            return res.status(200).json({
                status : false,
                message: "Something went wrong",
                error  : error?.message
            })
        }
    }
    
}