import { Request, Response } from "express"
import User from "../models/user"


export const getUsers = async (req:Request, res: Response) =>{
    
    const users = await User.findAll({
        where: {
            status: true
        }
    });

    res.json({
        users
    })
}

export const getUser = async (req:Request, res: Response) =>{
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(user){
        res.json({
            msg: "getUser",
            id,
            user
        })
    }else{
        res.status(404).json({
            msg: `Does not exist an user by that id`,
        })
    }
    
}

export const postUser = async (req:Request, res: Response) =>{
    const { body } = req;
    try {
        
        const existeEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'There is already a user with the email: ' + body.email
            });
        }
        
        const user = await User.create(body);
        res.json( user );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator.'
        })     
    }
}

export const putUser = async (req:Request, res: Response) =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const userIdExist = await User.findByPk(id)
        if(!userIdExist){
            return res.status(404).send({
                status: 'error',
                error: 'No user found',
            })
        }
        const user = await User.update( body , { where: { id: id } });        
        res.json( user );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator.'
        })    
    }

}

export const deleteUser = async (req:Request, res: Response) =>{
    const { id } = req.params;
    // we will use "status" to indicate if the user is active or not:
    try {
        const userIdExist = await User.findByPk(id)
        if(!userIdExist){
            return res.status(404).send({
                status: 'error',
                error: 'No user found',
            })
        }
        await User.update({
            status: false
        },{
            where: {
                id: id  
        }});        
        return res.json(  );
    } catch (error) { 
        console.log(error); 
        res.status(500).json({
            msg: 'Talk to the administrator.'
        })    
    }
}