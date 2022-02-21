export default (schema: any) => {
    return (req: any, res: any, next: any) => {
        const { error } = schema.validate(req.body)
        const valid = error == null
        if (valid) {
            next()
        } else {
            const { details } = error
            const errorsDetail = details.map((i:any) => i.message)
            res.status(422).json({
                status: false,
                error: errorsDetail
            })
        }
    }
}
