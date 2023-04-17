import Board from "../schema/Board"

export default class BoardController {

    static async create_board(req, res){
        const inserted = await Board.create(req.body)
        if(inserted){
            res.status(200).json({
                status : true,
                message: "New Board Created",
            })
        }
        else{
            res.status(200).json({
                status : false,
                message: "Some thing went wrong",
            })
        }    
    }
}