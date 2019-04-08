import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/server'

chai.should()
chai.use(chaiHttp)

describe('api', () => {
	describe('/', () => {
		it('should return sent 1', async () => {
			const result = await chai.request(app).get('/hook/2?webhook=https://jsonplaceholder.typicode.com/posts')
			result.should.have.status(200)
			result.should.be.json
			result.body.sent.should.eq(1)
		})
	})
})
