import "@testing-library/jest-dom"
import { server } from '@/mock/node';

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())