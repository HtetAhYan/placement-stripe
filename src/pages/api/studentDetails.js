const handler = async (req, res) => {
    if(req.method === 'POST'){
        const data = await req.body
        res.status(200).json(data)
    } else {
        return res.status(403).json({message: 'Method not allowed'})
    }
}
export default handler