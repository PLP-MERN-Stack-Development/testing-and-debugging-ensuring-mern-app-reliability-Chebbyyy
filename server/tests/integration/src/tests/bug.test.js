const request = require('supertest');
const app = require('../server');

// Mock the Bug model
jest.mock('../models/Bug', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Bug = require('../models/Bug');

describe('Bug API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new bug', async () => {
    const mockBug = { _id: '1', title: 'Test Bug', description: 'This is a test bug', status: 'open' };
    Bug.create.mockResolvedValue(mockBug);

    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'open',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Bug');
    expect(Bug.create).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'This is a test bug',
      status: 'open',
    });
  });

  it('should get all bugs', async () => {
    const mockBugs = [{ _id: '1', title: 'Bug 1', description: 'Desc 1' }];
    Bug.find.mockResolvedValue(mockBugs);

    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(Bug.find).toHaveBeenCalled();
  });

  it('should update a bug', async () => {
    const mockBug = {
      _id: '1',
      title: 'Bug 1',
      description: 'Desc 1',
      status: 'open',
      save: jest.fn().mockResolvedValue({ _id: '1', title: 'Bug 1', description: 'Desc 1', status: 'resolved' })
    };
    Bug.findById.mockResolvedValue(mockBug);

    const res = await request(app)
      .put('/api/bugs/1')
      .send({ status: 'resolved' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('resolved');
    expect(Bug.findById).toHaveBeenCalledWith('1');
    expect(mockBug.save).toHaveBeenCalled();
  });

  it('should delete a bug', async () => {
    const mockBug = {
      _id: '1',
      title: 'Bug 1',
      description: 'Desc 1',
      remove: jest.fn()
    };
    Bug.findById.mockResolvedValue(mockBug);

    const res = await request(app).delete('/api/bugs/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Bug deleted');
    expect(Bug.findById).toHaveBeenCalledWith('1');
    expect(mockBug.remove).toHaveBeenCalled();
  });
});