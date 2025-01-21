import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import TaskProvider, { TaskContext } from '../context/TaskContext';

describe('Task Context', () => {
    it('should add a task correctly', () => {
        const { result } = renderHook(() => TaskContext, {
            wrapper: TaskProvider,
        });

        act(() => {
            result.current?.addTask('Test Task');
        });

        expect(result.current?.tasks.length).toBe(1);
        expect(result.current?.tasks[0].title).toBe('Test Task');
    });
});
